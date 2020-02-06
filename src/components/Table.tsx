import React from "react";
import MaterialTable, {Column} from "material-table";

interface Row {
  programName: string;
  programID: string;
  calendar: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function MaterialTableDemo() {
  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: "프로젝트 이름 ", field: "programName"},
      {title: "프로젝트 아이디", field: "programID"},
      {title: "생성일", field: "calendar", editable: "never"}
    ],
    data: [
      {
        programName: "BounceCode",
        programID: "test",
        calendar: 2020
      }
    ]
  });

  return (
    <MaterialTable
      title="프로젝트목록"
      columns={state.columns}
      data={state.data}
      localization={{
        header: {
          actions: "수정"
        },
        body: {
          emptyDataSourceMessage: "No records to display",
          filterRow: {
            filterTooltip: "Filter"
          }
        }
      }}
      options={{
        exportButton: true,
        actionsColumnIndex: -1
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return {...prevState, data};
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return {...prevState, data};
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return {...prevState, data};
              });
            }, 600);
          })
      }}
    />
  );
}
