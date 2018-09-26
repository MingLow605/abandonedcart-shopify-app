import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Layout, Page, Card, Stack, Button } from '@shopify/polaris';
import ObjectInspector from 'react-object-inspector';
import { downloadAbandonedCart } from '../api';

class DownloadAbandonedCart extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Layout sectioned>
        <Page>
          <Card sectioned title="Abandoned Cart">
            <Stack alignment="center">
              <Stack.Item fill>
                <p>Download the Abandoned Card Items to CSV</p>
              </Stack.Item>
              <Button primary onClick={() => dispatch(downloadAbandonedCart())}>
                Download
              </Button>
            </Stack>
          </Card>
        </Page>
      </Layout>
    );
  }
}

function mapStateToProps({}) {
  return {};
}
export default connect(mapStateToProps)(DownloadAbandonedCart);
