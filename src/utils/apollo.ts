import { ApolloError } from '@apollo/client'
import { showWarningMessage } from './antDesign'

export function handleApolloError(error: ApolloError) {
  showWarningMessage(error.message)
}
