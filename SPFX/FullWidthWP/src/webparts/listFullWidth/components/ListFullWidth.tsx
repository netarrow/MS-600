import * as React from 'react';
import styles from './ListFullWidth.module.scss';
import { IListFullWidthProps } from './IListFullWidthProps';
import { DetailsList, IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel'

export default class ListFullWidth extends React.Component<IListFullWidthProps, { filtersOpen }> {

  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      filtersOpen: false
    };
  }

  public render(): React.ReactElement<IListFullWidthProps> {
    const items = [{
      'Publication Number': 'DE 122345',
      'Applicant': 'JABAN TOBAC',
      'Priority Number': '123456 DE',
      'Priority Date': '18/03/1994',
      'Archive': 'R',
      'Class': 'VARIE23',
      'Note': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      'Comment': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Citation': ''
    }]
    const options: IDropdownOption[] = [
      { key: '1', text: 'Tizio' }
    ];
    let columns = buildColumns(items);
    columns.forEach(_ => { _.isMultiline = true; _.isResizable = true })
    columns.slice(0, 6).forEach(_ => _.maxWidth = 110)
    columns[7].maxWidth = 400
    columns[8].maxWidth = 400

    let openFilterPanel = (value) => {  this.setState({filtersOpen: true }) }
    let closeFilterPanel = (value) => {  this.setState({filtersOpen: false }) }

    let startSearch = () => { alert('Mock, here will start search') }

    let onRenderFooterContent = () => {
      return (
          <div>
              <PrimaryButton onClick={closeFilterPanel} style={ {margin: 5 } }>
                  Save
              </PrimaryButton>
              <DefaultButton onClick={closeFilterPanel} style={ {margin: 5 } }>Cancel</DefaultButton>
          </div>
      )
  }

    const stackTokens: IStackTokens = { childrenGap: 20 };
    return (
      <div className={ styles.listFullWidth }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <TextField placeholder="Search Query" />
            <PrimaryButton text="Start Search" onClick={startSearch} width="300px" style={ {margin: 5, marginLeft: 0 } } />
            <PrimaryButton text="Open Filters" onClick={openFilterPanel} width="300px" style={ {margin: 5, marginLeft: 0 } } />
            <PrimaryButton text="Export to Excel" width="300px" style={ {marginTop: 5} } />
            <Panel  isOpen={this.state.filtersOpen} onRenderFooterContent={onRenderFooterContent} isFooterAtBottom={true}
                    headerText="Refine Results Here">

              <Stack tokens={stackTokens}>
                  <Dropdown
                      placeholder="Applicant"
                      options={options}
                  />
                  <Dropdown placeholder="Pub. Number" options={options} />
                  <Dropdown placeholder="Archive" options={options} />
                  <Dropdown placeholder="Class" options={options} />
              </Stack>
            </Panel>
            <DetailsList
                items={items}
                setKey="set"
                columns={columns}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
