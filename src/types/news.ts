export interface Article {
  id: string;
  webTitle: string;
  webUrl: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  pillarName?: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    bodyText?: string;
    headline?: string;
    standfirst?: string;
  };
}

export interface GuardianResponse {
  response: {
    status: string;
    total: number;
    results: Article[];
  };
}

export type Category = {
  id: string;
  name: string;
};
