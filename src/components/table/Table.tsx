import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../../styles/table.scss";

type TableProps = {
  columns: GridColDef[];
  rows: any[];
  onClickRow?: (id: string | number) => void;
};

type RowProps = {
  id: string;
  name: String;
  status?: String;
  project?: String;
};

export default function Table({ columns, rows, onClickRow }: TableProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(row) => {
          onClickRow?.(row.id);
        }}
        disableRowSelectionOnClick={!onClickRow}
      />
    </div>
  );
}
