import { MaterialReactTable } from "material-react-table";
import { Box, Avatar, Typography, Pagination, PaginationItem, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useState, useMemo } from "react";
import tableSchema from "../data/tableSchema.json";  
import tableData from "../data/tableData.json";      

const defaultStatusColor = { bg: "#CCE6FF", text: "#0056B3" };

// Function to generate team color based on index
const getTeamColor = (index, totalTeams) => {
  const lightness = 70 - (index / totalTeams) * 30; 
  return { bg: `hsl(210, 100%, ${lightness}%)`, text: "white" };
};

const ConfigurableTable = () => {
  const [page, setPage] = useState(0); 
  const rowsPerPage = 10; 
  const totalPages = Math.ceil(tableData.length / rowsPerPage); 

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1); 
  };

  const columns = useMemo(() => {
    return tableSchema.map((column) => {
      if (column.accessorKey === "name") {
        return {
          ...column,
          Cell: ({ row }) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={row.original.profile} alt={row.original.name} sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography fontWeight="bold">{row.original.name}</Typography>
                <Typography>@{row.original.name}</Typography>
              </Box>
            </Box>
          ),
        };
      } 
      else if (column.accessorKey === "status") {
        return {
          ...column,
          Cell: ({ row }) => (
            <Box sx={{ bgcolor: defaultStatusColor.bg, color: defaultStatusColor.text, borderRadius: "16px", padding: "8px", fontWeight: "bold" }}>
              <Typography fontSize="12px">{row.original.status}</Typography>
            </Box>
          ),
        };
      } 
      else if (column.accessorKey === "teams") {
        return {
          ...column,
          Cell: ({ row }) => {
            const teams = row.original.teams || [];
            const extraTeam = teams.length > 3;

            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {teams.map((team, index) => {
                  const { bg, text } = getTeamColor(index, teams.length); 
                  return (
                    <Box key={index} sx={{ bgcolor: bg, color: text, borderRadius: "16px", padding: "4px 8px", fontSize: "12px", fontWeight: "bold" }}>
                      {team}
                    </Box>
                  );
                })}
                {extraTeam && (
                  <Box sx={{ bgcolor: "white", color: "black", borderRadius: "16px", padding: "4px 8px", fontSize: "12px", fontWeight: "bold", border: "1px solid black" }}>
                    +{teams.length - 3} 
                  </Box>
                )}
              </Box>
            );
          },
        };
      } 
      // Actions column with radio buttons
      else if (column.accessorKey === "actions") {
        return {
          ...column,
          Cell: () => (
            <RadioGroup row>
              <FormControlLabel value="option1" control={<Radio />} label="" />
              <FormControlLabel value="option2" control={<Radio />} label="" />
            </RadioGroup>
          ),
        };
      }
      return column;
    });
  }, []);

  return (
    <Box>
      <MaterialReactTable
        columns={columns}
        data={tableData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)} // Paginate data slice
        manualPagination
        muiTablePaginationProps={{ sx: { display: "none" } }} // Disable default pagination
        enableSorting={false} 
        enableColumnActions={false} 
        enableRowSelection
        enablePagination={false} // Disable internal pagination UI
      />

      {/* Pagination Component */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              style={{
                backgroundColor: item.page === page + 1 ? "#F0F8FF" : "transparent", 
                color: item.page === page + 1 ? "#0284C7" : "inherit", 
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default ConfigurableTable;
