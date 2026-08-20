      *================================================================
      * PROGRAMA:  PAYCALC
      * SISTEMA:   IBM i 7.5
      * DESCRIPCION: Cálculo de nómina semanal para empleados
      *              por hora y asalariados. Incluye cálculo de
      *              tiempo extra, IMSS e ISR (nómina mexicana).
      * ARCHIVOS:  EMPPF  - Maestro de empleados (entrada)
      *            TIMEPF - Registro de tiempo trabajado (entrada)
      *            PAYRPRT- Reporte de nómina (salida impresora)
      * AUTOR:     {{ NOMBRE DEL DESARROLLADOR }}
      * FECHA:     {{ FECHA DE CREACIÓN }}
      * VERSION:   1.0
      *================================================================
      *
      * --- ESPECIFICACIONES F (File Specifications) ---
      * Declaración de archivos de base de datos y dispositivos
      *
     FEMPPF     IF   E           K DISK
     FTIMEPF    IF   E           K DISK
     FPAYRPRT   O    F  132        PRINTER OFLIND(*IN90)
      *
      * --- ESPECIFICACIONES D (Definition Specifications) ---
      * Declaración de variables de trabajo y estructuras de datos
      *
      * Estructura de datos para cálculos de nómina
     D DS_PAYROLL      DS
     D  W_EMPNO                7A             * Número de empleado
     D  W_EMPNAME             40A             * Nombre completo
     D  W_DEPT                 4A             * Departamento
     D  W_HOURS_WKD            5  2           * Horas trabajadas
     D  W_HOURLY_RATE          7  2           * Tarifa por hora
     D  W_MONTHLY_SAL          9  2           * Salario mensual
     D  W_PAY_TYPE             1A             * H=Hora, S=Salario
      *
      * Variables de cálculo de nómina
     D W_BASE_PAY          S   9  2           * Pago base calculado
     D W_OVERTIME_PAY      S   9  2           * Pago de tiempo extra
     D W_GROSS_PAY         S   9  2           * Pago bruto total
     D W_IMSS_EMP          S   7  2           * Cuota IMSS empleado
     D W_ISR_WITHHELD      S   9  2           * ISR retenido
     D W_NET_PAY           S   9  2           * Pago neto a depositar
      *
      * Constantes de cálculo IMSS e ISR (México 2024)
     D C_IMSS_RATE         C                   CONST(0.02125)
     D C_OVT_FACTOR        C                   CONST(1.5)
     D C_WEEKLY_HRS        C                   CONST(40)
      *
      * Tablas ISR - tramos para retención mensual (simplificado)
     D T_ISR_LIMIT         S   9  2   DIM(5)
     D T_ISR_BASE_TAX      S   9  2   DIM(5)
     D T_ISR_RATE          S   5  4   DIM(5)
      *
      * Variables auxiliares
     D W_OVERTIME_HRS      S   5  2           * Horas extras
     D W_WEEKLY_SAL        S   9  2           * Equivalente semanal
     D W_ISR_BASE          S   9  2           * Base gravable ISR
     D W_TRAMO             S   3  0           * Tramo ISR aplicable
     D W_FOUND_EMP         S   1A             * Indicador empleado encontrado
     D W_LINE_COUNT        S   3  0           * Contador de líneas
     D W_PAGE_COUNT        S   3  0           * Contador de páginas
      *
      * --- ESPECIFICACIONES C (Calculation Specifications) ---
      * Lógica principal del programa
      *
      * C* Inicializar tablas ISR al inicio del programa
     C     *INZSR        BEGSR
      * Tramo 1: hasta $8,913.82 mensuales — tasa 1.92%
     C                   EVAL      T_ISR_LIMIT(1)    = 8913.82
     C                   EVAL      T_ISR_BASE_TAX(1) = 0.00
     C                   EVAL      T_ISR_RATE(1)     = 0.0192
      * Tramo 2: $8,913.83 a $20,770.29 — tasa 6.40%
     C                   EVAL      T_ISR_LIMIT(2)    = 20770.29
     C                   EVAL      T_ISR_BASE_TAX(2) = 171.26
     C                   EVAL      T_ISR_RATE(2)     = 0.0640
      * Tramo 3: $20,770.30 a $30,000.00 — tasa 10.88%
     C                   EVAL      T_ISR_LIMIT(3)    = 30000.00
     C                   EVAL      T_ISR_BASE_TAX(3) = 931.21
     C                   EVAL      T_ISR_RATE(3)     = 0.1088
      * Tramo 4: $30,000.01 a $58,922.16 — tasa 16.00%
     C                   EVAL      T_ISR_LIMIT(4)    = 58922.16
     C                   EVAL      T_ISR_BASE_TAX(4) = 2934.16
     C                   EVAL      T_ISR_RATE(4)     = 0.1600
      * Tramo 5: más de $58,922.17 — tasa 21.36%
     C                   EVAL      T_ISR_LIMIT(5)    = 999999.99
     C                   EVAL      T_ISR_BASE_TAX(5) = 7548.64
     C                   EVAL      T_ISR_RATE(5)     = 0.2136
     C                   EVAL      W_PAGE_COUNT      = 0
     C                   EVAL      W_LINE_COUNT      = 99
     C                   ENDSR
      *
      * C* Ciclo principal - leer registros de tiempo
     C     *IN90         IFEQ      '1'
     C                   EXSR      SR_PRINT_HDR
     C                   ENDIF
      *
     C                   READ      TIMEPF
     C     *EOF          DOWEQ     *OFF
      *
      * Buscar empleado en maestro EMPPF
     C     T_EMPNO       CHAIN     EMPPF
     C     *IN60         IFEQ      '1'
      * Empleado no encontrado - reportar error y continuar
     C                   EXSR      SR_EMP_NOTFOUND
     C                   READ      TIMEPF
     C                   ITER
     C                   ENDIF
      *
      * Copiar datos del empleado a estructura de trabajo
     C                   EVAL      W_EMPNO       = E_EMPNO
     C                   EVAL      W_EMPNAME     = E_EMPNAME
     C                   EVAL      W_DEPT        = E_DEPT
     C                   EVAL      W_PAY_TYPE    = E_PAY_TYPE
     C                   EVAL      W_HOURLY_RATE = E_HOURLY_RATE
     C                   EVAL      W_MONTHLY_SAL = E_MONTHLY_SAL
     C                   EVAL      W_HOURS_WKD   = T_HOURS_WKD
      *
      * Calcular nómina según tipo de empleado
     C     W_PAY_TYPE    IFEQ      'H'
      * Empleado por horas: calcular pago base y tiempo extra
     C                   EXSR      SR_CALC_HOURLY
     C                   ELSE
      * Empleado asalariado: convertir salario mensual a semanal
     C                   EXSR      SR_CALC_SALARY
     C                   ENDIF
      *
      * Calcular deducciones obligatorias (IMSS e ISR)
     C                   EXSR      SR_CALC_IMSS
     C                   EXSR      SR_CALC_ISR
      *
      * Calcular pago neto
     C                   EVAL      W_NET_PAY = W_GROSS_PAY
     C                             - W_IMSS_EMP
     C                             - W_ISR_WITHHELD
      *
      * Imprimir línea de detalle en el reporte
     C                   EXSR      SR_PRINT_DETAIL
      *
      * Leer siguiente registro de tiempo
     C                   READ      TIMEPF
     C                   ENDDO
      *
      * Imprimir totales finales y cerrar reporte
     C                   EXSR      SR_PRINT_TOTALS
     C                   SETON                        LR
      *
      * -------------------------------------------------------
      * SR_CALC_HOURLY - Calcular pago para empleado por horas
      * -------------------------------------------------------
     C     SR_CALC_HOURLY BEGSR
      * Pago base: primeras 40 horas a tarifa normal
     C     W_HOURS_WKD   IFLE      C_WEEKLY_HRS
     C                   EVAL      W_BASE_PAY    = W_HOURS_WKD * W_HOURLY_RATE
     C                   EVAL      W_OVERTIME_PAY = 0
     C                   ELSE
      * Tiempo extra: horas sobre 40 a 1.5x la tarifa
     C                   EVAL      W_BASE_PAY    = C_WEEKLY_HRS * W_HOURLY_RATE
     C                   EVAL      W_OVERTIME_HRS = W_HOURS_WKD - C_WEEKLY_HRS
     C                   EVAL      W_OVERTIME_PAY = W_OVERTIME_HRS
     C                             * W_HOURLY_RATE
     C                             * C_OVT_FACTOR
     C                   ENDIF
     C                   EVAL      W_GROSS_PAY   = W_BASE_PAY + W_OVERTIME_PAY
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_CALC_SALARY - Calcular equivalente semanal para asalariados
      * -------------------------------------------------------
     C     SR_CALC_SALARY BEGSR
      * Convertir salario mensual a semanal (/ 4.33 semanas promedio)
     C                   EVAL      W_WEEKLY_SAL  = W_MONTHLY_SAL / 4.33
     C                   EVAL      W_BASE_PAY    = W_WEEKLY_SAL
     C                   EVAL      W_OVERTIME_PAY = 0
     C                   EVAL      W_GROSS_PAY   = W_BASE_PAY
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_CALC_IMSS - Cuota IMSS del empleado
      * Tasa: 2.125% del salario base de cotización
      * -------------------------------------------------------
     C     SR_CALC_IMSS  BEGSR
     C                   EVAL      W_IMSS_EMP    = W_GROSS_PAY * C_IMSS_RATE
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_CALC_ISR - Retención ISR usando tabla de tramos
      * -------------------------------------------------------
     C     SR_CALC_ISR   BEGSR
      * Base gravable = Pago bruto (menos exenciones, simplificado)
     C                   EVAL      W_ISR_BASE    = W_GROSS_PAY * 4.33
     C                   EVAL      W_TRAMO       = 1
      * Encontrar el tramo fiscal aplicable
     C                   DO        5             W_TRAMO
     C     W_ISR_BASE    IFLE      T_ISR_LIMIT(W_TRAMO)
     C                   LEAVE
     C                   ENDIF
     C                   ENDDO
      * Calcular ISR: cuota fija + tasa marginal sobre el excedente
     C                   EVAL      W_ISR_WITHHELD =
     C                             (T_ISR_BASE_TAX(W_TRAMO) +
     C                             (W_ISR_BASE - T_ISR_LIMIT(W_TRAMO - 1)) *
     C                             T_ISR_RATE(W_TRAMO)) / 4.33
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_EMP_NOTFOUND - Manejo de empleado no encontrado
      * -------------------------------------------------------
     C     SR_EMP_NOTFOUND BEGSR
     C                   EXCEPT    ERR_LINE
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_PRINT_HDR - Imprimir encabezado del reporte
      * -------------------------------------------------------
     C     SR_PRINT_HDR  BEGSR
     C                   EVAL      W_PAGE_COUNT  = W_PAGE_COUNT + 1
     C                   EXCEPT    HDR_LINE
     C                   EVAL      W_LINE_COUNT  = 0
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_PRINT_DETAIL - Imprimir línea de detalle
      * -------------------------------------------------------
     C     SR_PRINT_DETAIL BEGSR
     C     W_LINE_COUNT  IFGE      55
     C                   EXSR      SR_PRINT_HDR
     C                   ENDIF
     C                   EXCEPT    DET_LINE
     C                   EVAL      W_LINE_COUNT  = W_LINE_COUNT + 1
     C                   ENDSR
      *
      * -------------------------------------------------------
      * SR_PRINT_TOTALS - Imprimir totales del reporte
      * -------------------------------------------------------
     C     SR_PRINT_TOTALS BEGSR
     C                   EXCEPT    TOT_LINE
     C                   ENDSR
      *
      **==============================================================
      ** SECCIÓN ILE RPG FREE-FORM — VERSIÓN MODERNIZADA
      ** Las siguientes declaraciones son equivalentes free-form de
      ** la lógica anterior. Representan el destino de la migración.
      **==============================================================
      /free

       // ============================================================
       // PAYCALC — Versión ILE RPG Free-Form (IBM i 7.5)
       // Equivalente moderno del código fixed-form anterior
       // ============================================================

       ctl-opt dftactgrp(*no) actgrp('PAYCALC') option(*srcstmt: *nodebugio);

       // Declaración de archivos con dcl-f
       dcl-f EMPPF  keyed usage(*input);
       dcl-f TIMEPF usage(*input);
       dcl-f PAYRPRT printer(*ext) oflind(w_overflow) usropn;

       // Declaración de variables de trabajo con dcl-s
       dcl-s w_empno        char(7);
       dcl-s w_empname      char(40);
       dcl-s w_dept         char(4);
       dcl-s w_pay_type     char(1);
       dcl-s w_hours_wkd    packed(5:2);
       dcl-s w_hourly_rate  packed(7:2);
       dcl-s w_monthly_sal  packed(9:2);
       dcl-s w_base_pay     packed(9:2);
       dcl-s w_overtime_pay packed(9:2);
       dcl-s w_gross_pay    packed(9:2);
       dcl-s w_imss_emp     packed(7:2);
       dcl-s w_isr_held     packed(9:2);
       dcl-s w_net_pay      packed(9:2);
       dcl-s w_overflow     ind;
       dcl-s w_eof          ind;

       // Constantes de nómina
       dcl-c C_OVT_FACTOR   1.5;
       dcl-c C_WEEKLY_HRS   40;
       dcl-c C_IMSS_RATE    0.02125;

       // ============================================================
       // PROC: CALC_BASE_PAY — Calcular pago base para empleado/hora
       // ============================================================
       dcl-proc CALC_BASE_PAY;
         dcl-pi *n packed(9:2);
           p_hours packed(5:2) value;   // Horas trabajadas en la semana
           p_rate  packed(7:2) value;   // Tarifa por hora
         end-pi;

         // Solo las primeras 40 horas cuentan como tiempo regular
         if p_hours > C_WEEKLY_HRS;
           return C_WEEKLY_HRS * p_rate;
         else;
           return p_hours * p_rate;
         endif;
       end-proc;

       // ============================================================
       // PROC: CALC_OVERTIME — Calcular pago de tiempo extra al 1.5x
       // Horas trabajadas por encima de 40 se pagan a 1.5x la tarifa
       // ============================================================
       dcl-proc CALC_OVERTIME;
         dcl-pi *n packed(9:2);
           p_hours packed(5:2) value;   // Total de horas trabajadas
           p_rate  packed(7:2) value;   // Tarifa por hora normal
         end-pi;
         dcl-s overtime_hrs packed(5:2);  // Horas extras calculadas

         // Sin tiempo extra si horas <= 40 o valor inválido
         if p_hours <= C_WEEKLY_HRS or p_hours <= 0;
           return 0;
         endif;

         // Calcular horas en exceso de 40
         overtime_hrs = p_hours - C_WEEKLY_HRS;

         // Retornar pago extra: horas extra × tarifa × factor 1.5
         return overtime_hrs * p_rate * C_OVT_FACTOR;
       end-proc;

       // ============================================================
       // PROC: CALC_IMSS — Calcular cuota IMSS del empleado
       // Tasa vigente 2024: 2.125% del salario base de cotización
       // ============================================================
       dcl-proc CALC_IMSS;
         dcl-pi *n packed(7:2);
           p_gross packed(9:2) value;   // Pago bruto semanal
         end-pi;

         return p_gross * C_IMSS_RATE;
       end-proc;

       // ============================================================
       // PROC: CALC_ISR — Retención de ISR semanal (tabla simplificada)
       // Se estima el equivalente mensual y se aplica la tabla de tramos
       // ============================================================
       dcl-proc CALC_ISR;
         dcl-pi *n packed(9:2);
           p_gross packed(9:2) value;   // Pago bruto semanal
         end-pi;
         dcl-s monthly_equiv packed(9:2);  // Equivalente mensual
         dcl-s isr_monthly    packed(9:2); // ISR mensual calculado
         dcl-s isr_weekly     packed(9:2); // ISR convertido a semanal

         // Estimar ingreso mensual equivalente (× 4.33 semanas)
         monthly_equiv = p_gross * 4.33;

         // Aplicar tabla de tramos ISR (valores 2024 simplificados)
         select;
           when monthly_equiv <= 8913.82;
             isr_monthly = monthly_equiv * 0.0192;
           when monthly_equiv <= 20770.29;
             isr_monthly = 171.26 + (monthly_equiv - 8913.82) * 0.0640;
           when monthly_equiv <= 30000.00;
             isr_monthly = 931.21 + (monthly_equiv - 20770.29) * 0.1088;
           when monthly_equiv <= 58922.16;
             isr_monthly = 2934.16 + (monthly_equiv - 30000.01) * 0.1600;
           other;
             isr_monthly = 7548.64 + (monthly_equiv - 58922.17) * 0.2136;
         endsl;

         // Convertir ISR mensual a retención semanal
         isr_weekly = isr_monthly / 4.33;
         return isr_weekly;
       end-proc;

       // ============================================================
       // PROC: PROCESS_EMPLOYEE — Orquestador principal por empleado
       // Llama a todos los procedimientos de cálculo en orden correcto
       // ============================================================
       dcl-proc PROCESS_EMPLOYEE;
         dcl-pi *n;
           p_empno  char(7)   const;   // Número de empleado a procesar
           p_hours  packed(5:2) value; // Horas trabajadas
         end-pi;

         // Buscar empleado en maestro EMPPF
         chain(e) p_empno EMPPF;
         if not %found(EMPPF);
           // Empleado no encontrado — registrar error y salir
           return;
         endif;

         // Copiar campos del maestro a variables de trabajo
         w_empno       = E_EMPNO;
         w_empname     = E_EMPNAME;
         w_dept        = E_DEPT;
         w_pay_type    = E_PAY_TYPE;
         w_hourly_rate = E_HOURLY_RATE;
         w_monthly_sal = E_MONTHLY_SAL;
         w_hours_wkd   = p_hours;

         // Calcular pago según tipo de empleado
         if w_pay_type = 'H';
           // Empleado por hora: pago base + tiempo extra
           w_base_pay     = CALC_BASE_PAY(w_hours_wkd: w_hourly_rate);
           w_overtime_pay = CALC_OVERTIME(w_hours_wkd: w_hourly_rate);
         else;
           // Empleado asalariado: equivalente semanal, sin tiempo extra
           w_base_pay     = w_monthly_sal / 4.33;
           w_overtime_pay = 0;
         endif;

         // Pago bruto = base + tiempo extra
         w_gross_pay = w_base_pay + w_overtime_pay;

         // Calcular deducciones obligatorias
         w_imss_emp = CALC_IMSS(w_gross_pay);
         w_isr_held = CALC_ISR(w_gross_pay);

         // Pago neto al empleado
         w_net_pay = w_gross_pay - w_imss_emp - w_isr_held;

       end-proc;

      /end-free
      *
      * FIN DE PAYCALC.rpgle
      *================================================================
