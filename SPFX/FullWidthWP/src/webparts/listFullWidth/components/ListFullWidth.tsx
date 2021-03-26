import * as React from 'react';
import styles from './ListFullWidth.module.scss';
import { IListFullWidthProps } from './IListFullWidthProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DetailsList, IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';

export default class ListFullWidth extends React.Component<IListFullWidthProps, {}> {
  public render(): React.ReactElement<IListFullWidthProps> {
    const items = [{Id: 1, Nome: 'qq', Desc: 'asdf', Test: 'asdf',
    Column: '', Another: 'asdfasdfasdf',
    LongText: 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfsadfasfasdfsadfasdfasdfasdfasdfsadfsadfsadfasdf',
    ColumnBu: 'qq'
    }]
    const columns = buildColumns(items);
    return (
      <div className={ styles.listFullWidth }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
            <DetailsList
                className={ styles.list }
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
