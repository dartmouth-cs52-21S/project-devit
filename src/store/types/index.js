/* eslint-disable key-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable no-multi-spaces */

const ActionTypes = {
  FETCH_PROJECTS          : 'projects/FETCH_PROJECTS'          ,
  FETCH_PROJECTS_FOR_USER : 'projects/FETCH_PROJECTS_FOR_USER' ,
  FETCH_PROJECT           : 'projects/FETCH_PROJECT'           ,
  DELETE_PROJECT          : 'projects/DELETE_PROJECT'          ,
  NEW_PROJECT             : 'projects/NEW_PROJECT'             ,
  AUTH_USER               : 'auth/AUTH_USER'                   ,
  DEAUTH_USER             : 'auth/DEAUTH_USER'                 ,
  TOGGLE_SIDEBAR          : 'sidebar/TOGGLE_SIDEBAR'           ,
  TOGGLE_MODAL_VISIBILITY : 'modal/TOGGLE_MODAL_VISIBILITY'    ,
  UPDATE_CHAT_MESSAGES    : 'chat/UPDATE_CHAT_MESSAGES'        ,
  ADD_CHAT_MESSAGE        : 'chat/ADD_CHAT_MESSAGE'            ,
  CLEAR_CHAT              : 'chat/CLEAR_CHAT'                  ,
};

export default ActionTypes;
