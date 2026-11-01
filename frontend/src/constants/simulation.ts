/**
 * Minimum score for each interview stage. Both the virtual/HR interview and
 * the technical interview must reach this mark before the workplace unlocks.
 * Must stay in sync with `INTERVIEW_PASS_SCORE` on the backend.
 */
export const INTERVIEW_PASS_SCORE = 65

/** @deprecated Use INTERVIEW_PASS_SCORE — kept for older imports. */
export const SIMULATION_PASS_SCORE = INTERVIEW_PASS_SCORE
