export interface Event {
    id: string;
    name: string;
    startTime: number;
    endTime: number;
}

export interface State {
    events: Record<string, Event[]>;
    startDate: string;
    start: number;
    end: number;
    day: number;
    select: boolean;
}

export interface Action {
    type: string;
    payload: {
        id: string;
        name: string;
        date: string;
        startDate: string;
        end: number;
        startTime: number;
        endTime: number;
        start: number;
        day: number;
    };
}