import NodeCG from '@nodecg/types';

export default (nodecg: NodeCG.ServerAPI) => {
  const alert = () => {
    console.log('extensionは動いています');
  };

  nodecg.listenFor('alert', alert);
};
