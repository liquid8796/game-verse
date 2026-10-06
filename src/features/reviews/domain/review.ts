export interface RatingSummary {
  average: number;
  count: number;
}

export interface PublicGameReview {
  userId: string;
  username: string;
  displayName: string;
  headline: string;
  body: string;
  rating: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberReview {
  headline: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export function isValidRating(score: number) {
  return Number.isInteger(score) && score >= 1 && score <= 10;
}

export function validateReview(headline: string, body: string) {
  const normalizedHeadline = headline.trim();
  const normalizedBody = body.trim();
  if (normalizedHeadline.length < 3 || normalizedHeadline.length > 80) {
    return "Headline must be between 3 and 80 characters.";
  }
  if (normalizedBody.length < 40 || normalizedBody.length > 2000) {
    return "Review must be between 40 and 2,000 characters.";
  }
  return undefined;
}
