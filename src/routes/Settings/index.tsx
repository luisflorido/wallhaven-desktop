import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateSetting } from '@/store/ducks/setting';
import React, { useEffect, useState } from 'react';
import Header from '@/components/atoms/Header';
import { ISetting } from '@/types/setting';
import { showToast } from '@/helpers';
import { useHistory } from 'react-router-dom';
import { Configuration, Container, Content, Title } from './styles';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { settings } = useAppSelector(state => state.setting);
  const [apiToken, setApiToken] = useState(settings.apiToken);
  const [minutesToRefresh, setMinutesToRefresh] = useState(
    settings.minutesToRefresh,
  );
  const [downloadsPath, setDownloadsPath] = useState(settings.downloadsPath);

  const updateField = (name: keyof ISetting, value: string) => {
    if (name === 'apiToken') {
      setApiToken(value);
    } else if (name === 'minutesToRefresh') {
      setMinutesToRefresh(Number(value) || 5);
    } else if (name === 'downloadsPath') {
      setDownloadsPath(value);
    }
  };

  useEffect(() => {
    window.Main.on('sel-dir', (folder: string[]) =>
      updateField('downloadsPath', folder?.[0]),
    );
  }, []);

  const saveSettings = () => {
    if (apiToken && minutesToRefresh && downloadsPath) {
      dispatch(
        updateSetting({
          apiToken,
          minutesToRefresh,
          downloadsPath,
        }),
      );
      showToast({
        message: 'Settings updated.',
        type: 'success',
      });
      history.goBack();
    } else {
      showToast({
        message: 'Please fill all fields.',
        type: 'error',
      });
    }
  };

  return (
    <Container>
      <Header title="Settings" />
      <Content>
        <Configuration>
          <Title>API Token</Title>
          <Input
            name="api-token"
            onChange={event => updateField('apiToken', event.target.value)}
            value={apiToken || ''}
            type="password"
          />
        </Configuration>
        <Configuration>
          <Title>Minutes to refresh</Title>
          <Input
            name="minutes-to-refresh"
            onChange={event =>
              updateField('minutesToRefresh', event.target.value)
            }
            type="number"
            value={minutesToRefresh}
          />
        </Configuration>
        <Configuration>
          <Title>Download folder</Title>
          <div className="flex">
            <div className="flex-1">
              <Input
                name="downloads-path"
                onChange={() => {}}
                value={downloadsPath || ''}
                style={{ marginRight: 10 }}
              />
            </div>
            <Button onClick={() => window.Main.openDialog()}>
              Select folder
            </Button>
          </div>
        </Configuration>
        <Button onClick={saveSettings}>Save</Button>
      </Content>
    </Container>
  );
};

export default Settings;
