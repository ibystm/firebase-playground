import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { actions, useSelector } from "../../../../store";
import { ModeIndex } from "../../../../types/redux/contentsMode";

export const ChoiceTabs: React.FC = () => {
  const dispatch = useDispatch();
  const modeIndex = useSelector((state) => state.contentsMode.modeIndex);
  const modes = ["映画", "ドラマ"];

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="purple"
      onChange={(index) => {
        dispatch(actions.changeMode(index as ModeIndex));
        dispatch(actions.resetSelectedGenre());
      }}
      index={modeIndex}
    >
      <TabList>
        {modes.map((m, index) => (
          <Tab
            key={m}
            boxShadow={
              index === modeIndex
                ? "10px 10px 24px #e6e6e6, -10px -10px 24px #ffffff"
                : undefined
            }
            _focus={{ boxShadow: "none" }}
          >
            {m}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};