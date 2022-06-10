import './epoch.table.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  useQuery,
  gql
} from "@apollo/client";
import { GET_ALL_EPOCHES, GET_SEARCH_EPOCH_BY_START_BLOCK } from '../../apollo/queries';

const columns = [
  { field: 'id', headerName: 'Id', width: 100, sortable: false },
  {
    field: 'startBlock',
    headerName: 'Start Block',
    width: 250,
  },
  {
    field: 'endBlock',
    headerName: 'End Block',
    width: 250,
    sortable: false,
  },
  {
    field: 'totalQueryFees',
    headerName: 'Total Query Fees',
    width: 250,
    sortable: false,
  },
];

function EpochTable() {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [searchStartBlock, setSearchStartBlock] = useState(null);
  const [epoches, setEpoches] = useState([]);
  const { loading, error, data: allEpochData } = useQuery(GET_ALL_EPOCHES, {
    variables: { orderDirection },
  });

  const { loading: loadingDataByStartBlock, error: errorDataByStartBlock, data: allEpochDataByStartBlock } = useQuery(GET_SEARCH_EPOCH_BY_START_BLOCK, {
    variables: { searchStartBlock },
  });

  const handleSortModelChange = useCallback((sortModel) => {
    if (sortModel.length > 0) {
      const sortValue = sortModel.find(item => {
        return item.field === 'startBlock'
      })
      setOrderDirection(sortValue.sort);
    }
  }, []);

  const handleSearchChange = useCallback((value) => {
    const num = parseInt(value);
    setSearchStartBlock(!isNaN(num) ? num : null);
  }, []);

  const formatValues = (value) => {
    return value.map(item => ({ ...item, totalQueryFees: (item.totalQueryFees / Math.pow(10, 18)).toFixed(2) }));
  }

  useEffect(() => {
    let epochData = [];
    if (searchStartBlock && allEpochDataByStartBlock) {
      epochData = formatValues(allEpochDataByStartBlock?.epoches);
    } else if (allEpochData) {
      epochData = formatValues(allEpochData?.epoches);
    }
    setEpoches(epochData);

  }, [searchStartBlock, allEpochDataByStartBlock, allEpochData])

  return (
    <section>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign={'left'}>
          <h1>Epoches</h1>
        </Grid>
        <Grid item xs={12} textAlign={'left'}>
          <p>
            Search Epoch: <input type="text" placeholder='Enter Start Block' onChange={(e) => { handleSearchChange(e.target.value) }} />
          </p>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: '100%' }}>
            {error ? <h1>Error :</h1> : <DataGrid
              rows={epoches}
              columns={columns}
              disableSelectionOnClick
              density='compact'
              sortingMode="server"
              onSortModelChange={handleSortModelChange}
              disableColumnResize={false}
              loading={(loading || loadingDataByStartBlock ? true : false)}
            />}
          </div>
        </Grid>
      </Grid>
    </section>
  );
}

export default EpochTable;
