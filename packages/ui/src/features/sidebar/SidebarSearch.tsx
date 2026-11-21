import { Bot, Button, DropdownMenu, FolderPlus, Hash, PanelLeft } from "@openbot/ui";
import { Show } from "solid-js";
import { useText } from "../../text";
import { SidebarFilterMenu } from "./SidebarFilterMenu";
import { PlusIcon, SearchIcon } from "./SidebarIcons";
import { useSidebarScope } from "./sidebar-scope";

export function SidebarSearch() {
  const { layoutMutable, props, startCreateSection } = useSidebarScope();
  const { t } = useText();
  return (
    <div class="sidebar-search-wrap">
      <Button
        variant="ghost"
        type="button"
        class="sidebar-icon-button sidebar-search-trigger no-drag"
        aria-label={t("conversation.globalSearch.title")}
        title={t("conversation.globalSearch.title")}
        aria-haspopup="dialog"
        onClick={props.onOpenSearch}
      >
        <SearchIcon />
      </Button>
      <Show when={props.onTogglePageRail && !props.compact}>
        <Button
          variant="ghost"
          type="button"
          class="sidebar-icon-button sidebar-rail-toggle no-drag"
          aria-label={props.pageRailCollapsed ? t("sidebar.topbar.expand") : t("sidebar.topbar.collapse")}
          title={props.pageRailCollapsed ? t("sidebar.topbar.expand") : t("sidebar.topbar.collapse")}
          aria-controls="window-rail"
          aria-expanded={props.pageRailCollapsed ? "false" : "true"}
          onClick={props.onTogglePageRail}
        >
          <PanelLeft aria-hidden="true" />
        </Button>
      </Show>
      <SidebarFilterMenu />
      <Show when={props.createSupported !== false || props.onCreateChannel || layoutMutable()}>
        <DropdownMenu.Root placement="bottom-end" gutter={4}>
          <DropdownMenu.Trigger
            class="sidebar-icon-button sidebar-new-button no-drag"
            aria-label={props.onCreateChannel ? t("sidebar.new.menuWithChannel") : t("sidebar.new.menu")}
            aria-hidden={props.compact ? "true" : undefined}
            tabindex={props.compact ? -1 : 0}
          >
            <PlusIcon />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content>
              <Show when={props.createSupported !== false}>
                <DropdownMenu.Item onSelectAfterClose={props.onCreateAgent}>
                  <Bot aria-hidden="true" />
                  {t("sidebar.new.agent")}
                </DropdownMenu.Item>
              </Show>
              <Show when={props.onCreateChannel}>
                <DropdownMenu.Item onSelectAfterClose={() => props.onCreateChannel?.()}>
                  <Hash aria-hidden="true" />
                  {t("sidebar.new.channel")}
                </DropdownMenu.Item>
              </Show>
              <Show when={layoutMutable()}>
                <DropdownMenu.Item onSelectAfterClose={() => startCreateSection()}>
                  <FolderPlus aria-hidden="true" />
                  {t("sidebar.new.section")}
                </DropdownMenu.Item>
              </Show>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Show>
    </div>
  );
}
