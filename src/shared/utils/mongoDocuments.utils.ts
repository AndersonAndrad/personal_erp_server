import { Document } from 'mongoose';

export const formatMongoDocuments = (
  document: Document<any> | Document<any>[],
) => {
  return JSON.parse(JSON.stringify(document));
};
