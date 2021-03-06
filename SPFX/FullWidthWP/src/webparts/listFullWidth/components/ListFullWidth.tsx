import * as React from 'react';
import styles from './ListFullWidth.module.scss';
import { IListFullWidthProps } from './IListFullWidthProps';
import { DetailsList, IColumn, buildColumns, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class ListFullWidth extends React.Component<IListFullWidthProps, { filtersOpen, searchQuery }> {
ctx: WebPartContext
  constructor(props) {
    super(props);
    this.ctx = props.context
    // Define the initial state:
    this.state = {
      filtersOpen: false,
      searchQuery: 'patent'
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
      { key: '1', text: 'Mock' }
    ];
    let columns = buildColumns(items);
    columns.forEach(_ => { _.isMultiline = true; _.isResizable = true })
    columns.slice(0, 6).forEach(_ => _.maxWidth = 110)
    columns[7].maxWidth = 400
    columns[8].maxWidth = 400

    let openFilterPanel = (value) => {  this.setState({filtersOpen: true }) }
    let closeFilterPanel = (value) => {  this.setState({filtersOpen: false }) }

    let addItem = (value) => {  document.getElementById('openNewItem').click()  }

    let startSearch = () => {

    this.ctx.spHttpClient.get(`${this.ctx.pageContext.web.absoluteUrl}/_api/search/query?querytext='${this.state.searchQuery}'&querytemplate='{searchTerms}(ListId:"d05c9be9-3240-4d8d-97ce-73661e436460") AND (ContentTypeId:"0x01004A0A37AD0026014E9255720B79270A51006E59C8F7FEFEB84086C16BE71A29BCF2")'&rowlimit=5000&SelectProperties='Title,Patent,ContentTypeId'`,
                            SPHttpClient.configurations.v1)
                            .then((res: SPHttpClientResponse): Promise<{ obj: any }> => {
                              const jsonResponse = res.json();
                              console.log( jsonResponse);
                              return jsonResponse;
                            })
     }

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
            <PrimaryButton text="Open Filters" onClick={openFilterPanel} width="300px" style={ {margin: 5 } } />
            <PrimaryButton text="Export to Excel" width="300px" style={ {margin: 5} } />
            <PrimaryButton text="Add New Item" width="300px" onClick={addItem}  style={ {margin: 5} } />
            <a style={{ display: 'none' }} id="openNewItem" href="https://m365x605511.sharepoint.com/_layouts/15/listform.aspx?PageType=8&ListId=%7BD05C9BE9-3240-4D8D-97CE-73661E436460%7D&RootFolder=%2FLists%2FPatent&Source=https://m365x605511.sharepoint.com/&ContentTypeId=0x01004A0A37AD0026014E9255720B79270A51006E59C8F7FEFEB84086C16BE71A29BCF2">Add Item</a>
            <Panel  isOpen={this.state.filtersOpen}
                    onRenderFooterContent={onRenderFooterContent}
                    isFooterAtBottom={true}
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
                selectionMode={SelectionMode.multiple}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
