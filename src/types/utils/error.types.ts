export interface ErrorPayload{
    statusCode : number;
    message: string;
    errors ?: string[]
}