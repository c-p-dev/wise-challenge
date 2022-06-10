import {
    gql
} from "@apollo/client";

export const GET_ALL_EPOCHES = gql`
query getEpoches($orderDirection: String! ) {
  epoches(orderBy: startBlock, orderDirection: $orderDirection){
    id
    startBlock
    endBlock
    totalQueryFees
  }
}
`;

export const GET_SEARCH_EPOCH_BY_START_BLOCK = gql`
query getEpoches ($searchStartBlock: Int! ){
  epoches ( where: { startBlock: $searchStartBlock }){
    id
    startBlock
    endBlock
    totalQueryFees
  }
}
`;
 
 