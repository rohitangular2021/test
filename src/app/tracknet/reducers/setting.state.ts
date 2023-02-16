export interface UiSetting {
    showUsers: boolean | null | undefined
    showStudents: boolean | null | undefined
    showDashboard: boolean | null | undefined
}

export const initialUiSetting: UiSetting = {
    showUsers: false,
    showStudents: false,
    showDashboard: false
};


export interface profileSettings {
    showUsers: boolean | null | undefined
    showStudents: boolean | null | undefined
    showDashboard: boolean | null | undefined
}

export const initialProfileSettings: profileSettings = {
    showUsers: false,
    showStudents: false,
    showDashboard: false
};

export interface SettingState {
    UiSetting?: null | undefined | UiSetting;
    profileSettings?: null | undefined | UiSetting;
}

export const initialSettingState: SettingState = {
    UiSetting: initialUiSetting,
    profileSettings:initialProfileSettings
};


export interface mainSettingState {
    isSpinner?: null | undefined | boolean;
    error?: null | undefined | string;
    settings:SettingState
}

export const initialmainSettingState: mainSettingState = {
    isSpinner: false,
    error: null,
    settings:initialSettingState
};





