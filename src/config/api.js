// API Configuration
export const API_BASE_URL = "https://test.secretvisitor.co/dashboard/api";

// API Endpoints
export const API_ENDPOINTS = {
  ONE_BRANCH_REPORT: "/report/oneBranch",
  MORE_THAN_BRANCH_REPORT: "/report/moreThanBranch",
  QR_CODE_REPORT: "/report/qrCode",
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// [
//   {
//     title: "question1",
//     steps: [
//       {
//         name: "step1",
//         questions: [
//           {
//             type: "type1",
//             title: "question1",
//             options: ["op1", "op2"],
//           },
//         ],
//       },
//     ],
//   },
// ];
