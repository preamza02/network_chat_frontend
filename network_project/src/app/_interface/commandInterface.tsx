import { SPEACIAL_COMMAND_ENUNM } from "../_enum/speacial_command"

export interface commandInterface {
    type: SPEACIAL_COMMAND_ENUNM,
    nameProps: string,
    idProps: string,
    otherProps?: string,
}