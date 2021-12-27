import React from "react";
import { v4 } from "uuid";

export interface ITab {
  name: string;
  id: string;
}

export default function Tabs({
  onTabChange,
}: {
  onTabChange: (tab: string) => void;
}) {
  const [tabs, setTabs] = React.useState<ITab[]>([]);
  const [tab, setTab] = React.useState<ITab | null>(null);

  const addTab = React.useCallback(() => {
    setTabs([...tabs, { name: `New Tab`, id: v4() }]);
  }, [tabs]);

  React.useEffect(() => {
    if (tab) onTabChange(tab.id);
  }, [tab, onTabChange]);
  React.useEffect(() => {
    if (tab) localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs, tab]);

  React.useEffect(() => {
    const tabs = JSON.parse(localStorage.getItem("tabs") || "[]") as ITab[];

    if (tabs.length === 0) tabs.push({ name: "New Tab", id: v4() });
    setTabs(tabs);
    setTab(tabs[0]);
  }, []);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {tabs.map((t, i) => (
        <div
          onClick={() => {
            setTab(t);
          }}
        >
          <input
            style={{ outline: "none", background: tab === t ? "red" : "white" }}
            value={t.name}
            onChange={(e) => {
              const newTabs = [...tabs];
              newTabs[i].name = e.target.value;
              setTabs(newTabs);
            }}
          />
        </div>
      ))}
      <div style={{ cursor: "pointer" }} onClick={addTab}>
        +
      </div>
    </div>
  );
}
