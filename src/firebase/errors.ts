export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

// A custom error class for Firestore permission errors.
// It formats the error message in a way that provides rich, actionable context
// for debugging Security Rules in the Next.js development error overlay.
export class FirestorePermissionError extends Error {
  constructor(context: SecurityRuleContext) {
    const intro = 'FirestoreError: Missing or insufficient permissions. The following request was denied by Firestore Security Rules:';
    
    // We stringify the context to be easily parsable and readable in the error overlay.
    const contextString = JSON.stringify(context, null, 2);
    
    const message = `
${intro}
${contextString}
`;
    
    super(message);
    this.name = 'FirestorePermissionError';
  }
}
