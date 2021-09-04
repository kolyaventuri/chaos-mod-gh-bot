export const enum IssueType {
  BUG = 'BUG',
  EFFECT = 'EFFECT',
  FEATURE = 'FEATURE',
}

// TODO: Add method that can take the list of issue tags, and return the proper enum type
// the return likely needs to be IssueType | null, in the event that we have a missing tag?
// That probably needs to be later handled in the problems.ts file
