import { create } from "zustand"

const useRequestStore = create((set) => ({
  headers: "{}",
  jumpKey: null,
  jumpModeEnabled: false,
  query: "",
  response: `{
    {
    "data": {
        "bonusConfig": {
            "facebookReviewBonusAutomationEnabled": false,
            "facebookReviewBonusAutoStartAt": "2023-05-26T00:00:00.000Z",
            "facebookReviewBonusAutoRating": 1,
            "facebookReviewBonusCategoryId": 31,
            "npsBonusAmount": 100,
            "npsBonusAutomationEnabled": false,
            "npsBonusAutoStartAt": "2023-05-26T00:00:00.000Z",
            "npsBonusAutoRating": 10,
            "npsBonusCategoryId": 31,
            "npsBonusRequiredCommentEnabled": false,
            "reviewBonusAmount": 500,
            "reviewBonusAutomationEnabled": false,
            "reviewBonusAutoStartAt": "2023-05-24T00:00:00.000Z",
            "reviewBonusAutoRating": 5,
            "reviewBonusCategoryId": 3349,
            "teamPayoutAutomationEnabled": true,
            "tipMatchingBonusAutomationEnabled": false,
            "tipMatchingBonusAutoStartAt": "2023-06-07T00:00:00.000Z",
            "tipMatchingBonusCategoryId": 31,
            "tipMatchingBonusMaxAmount": 100,
            "1facebookReviewBonusAutomationEnabled": false,
            "1facebookReviewBonusAutoStartAt": "2023-05-26T00:00:00.000Z",
            "1facebookReviewBonusAutoRating": 1,
            "1facebookReviewBonusCategoryId": 31,
            "1npsBonusAmount": 100,
            "1npsBonusAutomationEnabled": false,
            "1npsBonusAutoStartAt": "2023-05-26T00:00:00.000Z",
            "1npsBonusAutoRating": 10,
            "1npsBonusCategoryId": 31,
            "1npsBonusRequiredCommentEnabled": false,
            "1reviewBonusAmount": 500,
            "1reviewBonusAutomationEnabled": false,
            "1reviewBonusAutoStartAt": "2023-05-24T00:00:00.000Z",
            "1reviewBonusAutoRating": 5,
            "1reviewBonusCategoryId": 3349,
            "1teamPayoutAutomationEnabled": true,
            "1tipMatchingBonusAutomationEnabled": false,
            "1tipMatchingBonusAutoStartAt": "2023-06-07T00:00:00.000Z",
            "1tipMatchingBonusCategoryId": 31,
            "1tipMatchingBonusMaxAmount": 100
        }
    }
}
  }`,
  setHeaders: (headers) => set({ headers }),
  setJumpKey: (jumpKey) => set({ jumpKey }),
  setJumpModeEnabled: (jumpModeEnabled) => set({ jumpModeEnabled }),
  setQuery: (query) => set({ query }),
  setResponse: (response) => set({ response }),
  setUrl: (url) => set({ url }),
  setVariables: (variables) => set({ variables }),
  url: "",
  variables: "{}",
}))
export default useRequestStore
