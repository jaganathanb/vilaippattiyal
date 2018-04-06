import React, { PureComponent } from 'react';
import VPPortal from './components/portal';
import VPModal from './components/modal';

type Props = {
  modals: any[],
  alert: any,
  closeModal: (data: any) => void
};

export default class VPModals extends PureComponent<Props> {
  render() {
    const { closeModal, alert } = this.props;
    const modals = this.props.modals.map(item => (
      <VPPortal key={item.id}>
        <VPModal alert={alert} item={item} onClose={data => closeModal(data)} />
      </VPPortal>
    ));
    return <div className="modals">{modals}</div>;
  }
}
