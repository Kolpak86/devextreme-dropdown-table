import React, { useState } from 'react';
import DropDownBox, { DropDownOptions } from 'devextreme-react/drop-down-box';
import DataGrid, {
  Selection,
  Paging,
  ToolbarItem,
  FilterPanel,
  ColumnChooser,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { Customer, customers } from './customers';
import { OptionChangedEventInfo } from 'devextreme/core/dom_component';
import dxDropDownBox from 'devextreme/ui/drop_down_box';
import { EventInfo, NativeEventInfo } from 'devextreme/events';
import { ValueChangedInfo } from 'devextreme/ui/editor/editor';
import dxDataGrid, { SelectionChangedInfo } from 'devextreme/ui/data_grid';
import { FilterBuilder } from 'devextreme-react';

const gridColumns = ['CompanyName', 'City', 'Phone'];
const fields: any[] = gridColumns.map((f) => ({
  fieldName: f,
}));

export const DropdownTable = ({
  gridBoxValue,
  dataGridOnSelectionChanged,
}: any) => {
  const onFilterValueChange = (value: any) => {
    // Nothing happen when we change the filter!!!!!!
    console.log(value);
  };
  return (
    <DataGrid
      id="test-data-grid"
      dataSource={gridDataSource}
      columns={gridColumns}
      hoverStateEnabled={true}
      selectedRowKeys={gridBoxValue}
      onSelectionChanged={dataGridOnSelectionChanged}
      height="100%"
    >
      <FilterPanel visible />
      <FilterBuilder fields={fields} onValueChange={onFilterValueChange} />
      <Selection mode="single" />
      <Paging enabled={true} pageSize={10} />
      <ColumnChooser enabled mode="select" />
    </DataGrid>
  );
};

function makeAsyncDataSource() {
  return new CustomStore({
    loadMode: 'raw',
    key: 'ID',
    load() {
      return customers;
    },
  });
}

const gridDataSource = makeAsyncDataSource();

function Dropdown() {
  const [gridBoxValue, setGridBoxValue] = useState([3]);
  const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);

  const gridBoxDisplayExpr = (item: Customer) =>
    item && `${item.CompanyName} <${item.Phone}>`;

  const syncDataGridSelection = (
    e: NativeEventInfo<dxDropDownBox, Event> & ValueChangedInfo
  ) => {
    console.log('syncDataGridSelection', e.value);
    setGridBoxValue(e.value);
  };

  const onGridBoxOpened = (e: OptionChangedEventInfo<dxDropDownBox>) => {
    if (e.name === 'opened') {
      setIsGridBoxOpened(e.value);
    }
  };

  const dataGridOnSelectionChanged = (
    e: EventInfo<dxDataGrid<Customer, any>> &
      SelectionChangedInfo<Customer, any>
  ) => {
    console.log('e.selectedRowKeys', e.selectedRowKeys);
    setGridBoxValue(e.selectedRowKeys);
    setIsGridBoxOpened(false);
  };

  const dataGridRender = () => (
    <DropdownTable
      gridBoxValue={gridBoxValue}
      dataGridOnSelectionChanged={dataGridOnSelectionChanged}
    />
  );

  // I use this method to prevent filter builder from closing
  const handleDropDownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const dropDownEditorOverlayClass = 'dx-dropdowneditor-overlay';
    const { classList } = e.target as Element;
    setTimeout(() => {
      if (
        classList.contains('dx-datagrid-filter-panel-text') ||
        classList.contains('dx-icon-filter')
      ) {
        const filterPanel = document.querySelector('.dx-overlay-shader');
        filterPanel?.classList.add(dropDownEditorOverlayClass);
      }
    }, 0);
  };

  return (
    <div className="dx-fieldset">
      <div className="dx-field">
        <div className="dx-field-label">DropDownBox with embedded DataGrid</div>
        <div onClick={handleDropDownClick} className="dx-field-value">
          <DropDownBox
            value={gridBoxValue}
            opened={isGridBoxOpened}
            valueExpr="ID"
            deferRendering={false}
            displayExpr={gridBoxDisplayExpr}
            placeholder="Select a value..."
            showClearButton={true}
            dataSource={gridDataSource}
            onValueChanged={syncDataGridSelection}
            onOptionChanged={onGridBoxOpened}
            contentRender={dataGridRender}
          >
            <DropDownOptions
              width={400}
              closeOnOutsideClick={false}
              hideOnOutsideClick={false}
            />
            <ToolbarItem />
          </DropDownBox>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
