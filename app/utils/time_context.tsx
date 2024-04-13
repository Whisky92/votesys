import { createContext } from "react";

const timeContext = createContext({
    vote_start: new Date(Date.parse('2024-04-13T13:39:00+02:00')),
    vote_end: new Date(Date.parse('2024-04-13T13:39:10+02:00')),
});

export default timeContext;