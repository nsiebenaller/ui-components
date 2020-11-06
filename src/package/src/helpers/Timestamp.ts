export default class Timestamp {
    inner: Date;
    timeZone: string;
    diff: number;

    constructor(date?: Date | number | string, timeZone?: string) {
        let d = new Date();
        if (date) {
            d = new Date(date);
        }
        if (!(d instanceof Date) || isNaN(d.getTime())) {
            d = new Date();
        }
        this.inner = d;
        this.timeZone = this.getNativeTimezone();
        this.diff = 0;
        if (timeZone) this.setTimezone(timeZone);
    }

    format(options?: Intl.DateTimeFormatOptions) {
        const formatter = Intl.DateTimeFormat("en-US", {
            timeZone: this.timeZone,
            ...options,
        });
        return formatter.format(this.toDate());
    }

    // Getters
    getInner(): Date {
        return this.inner;
    }
    getTime(): number {
        return this.inner.getTime() + this.diff;
    }
    toDate(): Date {
        return new Date(this.getTime());
    }

    // Setters
    setTimezone(timeZone: string) {
        const diff = this.findDiff(timeZone);
        if (!diff) return;
        this.timeZone = timeZone;
        this.diff = diff;
    }
    setInner(inner: Date) {
        this.inner = inner;
    }

    // Helpers
    findDiff(timeZone: string): number | null {
        try {
            const locale = this.inner.toLocaleString("en-US", { timeZone });
            const target = new Date(locale);
            return this.inner.getTime() - target.getTime();
        } catch (err) {
            console.error(err);
        }
        return null;
    }
    getNativeTimezone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // Exposed Date Functions
    setDate(date: number) {
        return this.inner.setDate(date);
    }
    setMonth(month: number, date?: number | undefined) {
        return this.inner.setMonth(month, date);
    }
    setHours(
        hours: number,
        min?: number | undefined,
        sec?: number | undefined,
        ms?: number | undefined
    ) {
        return this.inner.setHours(hours, min, sec, ms);
    }
    setFullYear(
        year: number,
        month?: number | undefined,
        date?: number | undefined
    ): number {
        return this.inner.setFullYear(year, month, date);
    }
    setTime(time: number): number {
        return this.inner.setTime(time);
    }
    setMilliseconds(ms: number): number {
        return this.inner.setMilliseconds(ms);
    }
    setMinutes(
        min: number,
        sec?: number | undefined,
        ms?: number | undefined
    ): number {
        return this.inner.setMinutes(min, sec, ms);
    }
    setSeconds(sec: number, ms?: number | undefined): number {
        return this.inner.setSeconds(sec, ms);
    }
    setUTCFullYear(
        year: number,
        month?: number | undefined,
        date?: number | undefined
    ): number {
        return this.inner.setUTCFullYear(year, month, date);
    }
    setUTCHours(
        hours: number,
        min?: number | undefined,
        sec?: number | undefined,
        ms?: number | undefined
    ): number {
        return this.inner.setUTCHours(hours, min, sec, ms);
    }
    setUTCDate(date: number): number {
        return this.inner.setUTCDate(date);
    }
    setUTCMinutes(
        min: number,
        sec?: number | undefined,
        ms?: number | undefined
    ): number {
        return this.inner.setUTCMinutes(min, sec, ms);
    }
    setUTCMilliseconds(ms: number): number {
        return this.inner.setUTCMilliseconds(ms);
    }
    setUTCMonth(month: number, date?: number | undefined): number {
        return this.inner.setUTCMonth(month, date);
    }
    setUTCSeconds(sec: number, ms?: number | undefined): number {
        return this.inner.setUTCSeconds(sec, ms);
    }
}
