variable rg_name {
  type = string
  description = "resource group name"
}
variable rg_location {
  type = string
  description = "resource group location"
}
variable rg_username {
  type = string
  description = "user name"
}
variable "rg_refix" {
  type        = string
  default     = "rg"
  description = "Prefix of the resource group name that's combined with a random ID so name is unique in your Azure subscription."
}