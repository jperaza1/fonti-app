import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimezoneService {
    private readonly ianaToWindows: { [key: string]: string } = {
        // Centro América
        'America/Guatemala': 'Central America Standard Time',
        'America/Belize': 'Central America Standard Time',
        'America/Costa_Rica': 'Central America Standard Time',
        'America/El_Salvador': 'Central America Standard Time',
        'America/Tegucigalpa': 'Central America Standard Time',
        'America/Managua': 'Central America Standard Time',
        'America/Panama': 'SA Pacific Standard Time',

        // México
        'America/Mexico_City': 'Central Standard Time (Mexico)',
        'America/Cancun': 'Eastern Standard Time',
        'America/Merida': 'Central Standard Time (Mexico)',
        'America/Monterrey': 'Central Standard Time (Mexico)',
        'America/Tijuana': 'Pacific Standard Time',
        'America/Chihuahua': 'Mountain Standard Time (Mexico)',
        'America/Hermosillo': 'US Mountain Standard Time',

        // Estados Unidos - Este
        'America/New_York': 'Eastern Standard Time',
        'America/Detroit': 'Eastern Standard Time',
        'America/Kentucky/Louisville': 'Eastern Standard Time',
        'America/Kentucky/Monticello': 'Eastern Standard Time',
        'America/Indiana/Indianapolis': 'Eastern Standard Time',
        'America/Indiana/Vincennes': 'Eastern Standard Time',
        'America/Indiana/Winamac': 'Eastern Standard Time',
        'America/Indiana/Marengo': 'Eastern Standard Time',
        'America/Indiana/Petersburg': 'Eastern Standard Time',
        'America/Indiana/Vevay': 'Eastern Standard Time',

        // Estados Unidos - Central
        'America/Chicago': 'Central Standard Time',
        'America/Indiana/Tell_City': 'Central Standard Time',
        'America/Indiana/Knox': 'Central Standard Time',
        'America/Menominee': 'Central Standard Time',
        'America/North_Dakota/Center': 'Central Standard Time',
        'America/North_Dakota/New_Salem': 'Central Standard Time',
        'America/North_Dakota/Beulah': 'Central Standard Time',

        // Estados Unidos - Montaña
        'America/Denver': 'Mountain Standard Time',
        'America/Boise': 'Mountain Standard Time',
        'America/Phoenix': 'US Mountain Standard Time',

        // Estados Unidos - Pacífico
        'America/Los_Angeles': 'Pacific Standard Time',
        'America/Anchorage': 'Alaskan Standard Time',
        'America/Juneau': 'Alaskan Standard Time',
        'America/Sitka': 'Alaskan Standard Time',
        'America/Metlakatla': 'Alaskan Standard Time',
        'America/Yakutat': 'Alaskan Standard Time',
        'America/Nome': 'Alaskan Standard Time',
        'America/Adak': 'Aleutian Standard Time',
        'Pacific/Honolulu': 'Hawaiian Standard Time',

        // Caribe
        'America/Puerto_Rico': 'SA Western Standard Time',
        'America/St_Thomas': 'SA Western Standard Time',
        'America/Santo_Domingo': 'SA Western Standard Time',
        'America/Havana': 'Eastern Standard Time',
        'America/Port-au-Prince': 'Eastern Standard Time',

        // Sur América
        'America/Bogota': 'SA Pacific Standard Time',
        'America/Lima': 'SA Pacific Standard Time',
        'America/Caracas': 'Venezuela Standard Time',
        'America/La_Paz': 'SA Western Standard Time',
        'America/Guyana': 'SA Western Standard Time',
        'America/Asuncion': 'Paraguay Standard Time',
        'America/Santiago': 'Pacific SA Standard Time',
        'America/Montevideo': 'Montevideo Standard Time',
        'America/Sao_Paulo': 'E. South America Standard Time',
        'America/Argentina/Buenos_Aires': 'Argentina Standard Time',

        // Otros importantes
        'UTC': 'UTC',
        'GMT': 'GMT Standard Time',
        'Etc/GMT': 'GMT Standard Time',
        'Etc/UTC': 'UTC'
    };

    // Lista de zonas horarias de Windows conocidas
    private readonly windowsTimezones = new Set([
        'Central America Standard Time',
        'Eastern Standard Time',
        'Central Standard Time',
        'Mountain Standard Time',
        'Pacific Standard Time',
        'Alaskan Standard Time',
        'Hawaiian Standard Time',
        'UTC',
        'GMT Standard Time',
        // ... agregar más si es necesario
    ]);

    getWindowsTimezone(): string {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Si la zona horaria ya está en formato Windows, la retornamos directamente
        if (this.isWindowsTimezone(timezone)) {
            return timezone;
        }

        // Si es formato IANA, la convertimos
        return this.ianaToWindows[timezone] || 'UTC';
    }

    private isWindowsTimezone(timezone: string): boolean {
        return this.windowsTimezones.has(timezone) || timezone.endsWith('Standard Time');
    }

    getCurrentOffset(): number {
        return new Date().getTimezoneOffset();
    }

    // Método de utilidad para debugging
    logTimezoneInfo(): void {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.debug('Timezone Info:', {
            original: timezone,
            isWindows: this.isWindowsTimezone(timezone),
            converted: this.getWindowsTimezone(),
            offset: this.getCurrentOffset()
        });
    }
}