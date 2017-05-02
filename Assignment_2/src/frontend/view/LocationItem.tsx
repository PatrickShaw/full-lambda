import * as React from 'react';

import { GenericListItem } from './GenericListItem';
import { OnClickObserver } from '../observers/OnClickObserver';
import { OnLocationItemClickedObserver } from '../observers/OnLocationItemClickedObserver';

interface LocationItemProps {
  location: string;
  rainfallMonitorSelected: boolean;
  temperatureMonitorSelected: boolean;
  onItemClickedObserver?: OnLocationItemClickedObserver;
}

class LocationItem extends React.Component<LocationItemProps, void> {
  private onClickObserver: OnClickObserver;
  constructor(props: LocationItemProps) {
    super(props);
    const that: LocationItem = this;
    this.onClickObserver = new class implements OnClickObserver {
      public onClick(): void {
        that.onItemClicked();
      }
    }();
  }

  public render(): JSX.Element {
    return (
      <div >
        <GenericListItem title={this.props.location} onClickObserver={this.onClickObserver}/>
        <div className="monitor-options">
          <GenericListItem 
            title={this.props.rainfallMonitorSelected ? 'Remove rainfall monitor' : 'Add rainfall monitor'}
          />
          <GenericListItem 
            title={this.props.temperatureMonitorSelected ? 'Remove rainfall monitor' : 'Add rainfall monitor'}
          />
        </div>
      </div>
    );
  }

  private onItemClicked(): void {
    const selected: boolean | undefined = this.props.selected;
    if (this.props.onItemClickedObserver) {
      this.props.onItemClickedObserver.onItemClicked(
        this.props.location, 
        selected ? true : false
      );
    }
  }
}
export {LocationItem};
export default LocationItem;
