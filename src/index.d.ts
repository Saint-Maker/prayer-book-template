interface Prayer {
  id: string
  title: string
  text: string
}

interface Mod {
  id: string
  name: string
  isNative: boolean
  path: string
  description: string
  issuesPageLink: string
}

interface SelectedMods {
  [key: string]: boolean
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}
