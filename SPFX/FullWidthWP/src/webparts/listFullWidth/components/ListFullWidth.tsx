import * as React from 'react';
import styles from './ListFullWidth.module.scss';
import { IListFullWidthProps } from './IListFullWidthProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DetailsList, IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Separator } from 'office-ui-fabric-react/lib/Separator';

export default class ListFullWidth extends React.Component<IListFullWidthProps, {}> {
  public render(): React.ReactElement<IListFullWidthProps> {
    const items = [{
      Id: 1,
      'Publication Number': 'qq',
      'Applicant': 'asdf',
      'Priority Number': 'asdf',
      'Priority Date': 'iuy',
      'Class': 'asdfasdfasdf',
      'Title': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      'Comment': 'qq'
    }]
    const options: IDropdownOption[] = [
      { key: '1', text: 'Tizio' }
    ];
    let columns = buildColumns(items);
    columns.forEach(_ => _.isMultiline = true)
    const stackTokens: IStackTokens = { childrenGap: 20 };
    return (
      <div className={ styles.listFullWidth }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <Stack tokens={stackTokens}>
                <Dropdown
                    placeholder="Select an option"
                    label="Choose Applicant"
                    options={options}
                />
                <TextField label="Comment" multiline rows={3} />
            </Stack>
            <PrimaryButton text="Filter" width="300px" style={ {marginTop: 5} } />
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
