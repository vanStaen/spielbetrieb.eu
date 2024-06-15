export const Review = `
type Review {
    _id: ID! 
    title: String!
    note: Float!
    edited: Boolean
    archived: Boolean
    createdAt: Float!
    updatedAt: Float!
}`;

export const ReviewInputData = `
input ReviewInputData {
    title: String
    note: Float
    edited: Boolean
    archived: Boolean
}`;

export const ReviewQueries = `
    getReviews: [Review]
    `;

export const ReviewMutations = `
    addReview(reviewInput: ReviewInputData!): Review!
    updateReview(reviewId: ID!, reviewInput: ReviewInputData!): Review!
    deleteReview(reviewId: ID!): Boolean!
`;
