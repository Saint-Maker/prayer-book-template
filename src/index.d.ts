interface Prayer {
  id: string
  title: string
  text: string
}

interface Habit {
  id: string
  name: string
  days: boolean[]
  editing: boolean
}

interface Mod {
  id: string
  name: string
  isNative: boolean
  path: string
  description: string
  inUse: boolean
  issuesPageLink: string
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
