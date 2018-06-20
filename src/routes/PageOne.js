import React from 'react';
import { connect } from 'dva';

function IndexPage() {
  return (
    <div>
      pageOne
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
