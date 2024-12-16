interface WelcomeMessageDTO {
    title: string;
    message: string;
}

interface VersionCheckDTO {
    isSupported: boolean;
    message: string;
    hasUpdate: boolean;
    newestVersion: string;
}

export type { WelcomeMessageDTO, VersionCheckDTO };
