export type ActionState =
  | { error: string; success?: false }
  | { success: true; error?: never }
  | undefined;
