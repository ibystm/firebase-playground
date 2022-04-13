import { Tab, TabList, Tabs } from "@chakra-ui/react";

export const ChoiceTabs: React.FC = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList>
        <Tab>映画</Tab>
        <Tab>ドラマ</Tab>
      </TabList>
    </Tabs>
  );
};