import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Paging,
  ColumnChooser,
} from 'devextreme-react/data-grid';

import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { employees } from './data';
import Dropdown from './components/dropdown';
import './table.scss';

const dataSource = new DataSource({
  store: new ArrayStore({
    data: employees,
    key: 'ID',
  }),
});

export default function Table() {
  return (
    <div id="data-grid-demo">
      <DataGrid dataSource={dataSource}>
        <Paging enabled={false} />
        <Editing
          mode="cell"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />
        <ColumnChooser enabled mode="select" />

        <Column dataField="Prefix" caption="Title" width={55} />
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="Position" width={170} />
        <Column
          dataField="StateID"
          caption="State"
          width={225}
          editCellComponent={Dropdown}
        >
          <Dropdown />
        </Column>
        <Column dataField="BirthDate" dataType="date" />
      </DataGrid>
    </div>
  );
}
