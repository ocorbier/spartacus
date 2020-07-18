import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import {
  USER_GROUP_ENTITIES,
  USER_GROUP_LIST,
  USER_GROUP_PERMISSIONS,
  USER_GROUP_AVAILABLE_CUSTOMERS,
  B2B_USER_ENTITIES,
  PERMISSION_ENTITIES,
} from '../organization-state';
import { ListModel } from '../../../model/misc.model';
import { UserGroup } from '../../../model/user-group.model';

export const LOAD_USER_GROUP = '[UserGroup] Load UserGroup Data';
export const LOAD_USER_GROUP_FAIL = '[UserGroup] Load UserGroup Data Fail';
export const LOAD_USER_GROUP_SUCCESS =
  '[UserGroup] Load UserGroup Data Success';

export const LOAD_USER_GROUPS = '[UserGroup] Load UserGroups';
export const LOAD_USER_GROUPS_FAIL = '[UserGroup] Load UserGroups Fail';
export const LOAD_USER_GROUPS_SUCCESS = '[UserGroup] Load UserGroups Success';

export const LOAD_USER_GROUP_PERMISSIONS = '[UserGroup] Load Permissions Data';
export const LOAD_USER_GROUP_PERMISSIONS_FAIL =
  '[UserGroup] Load Permissions Data Fail';
export const LOAD_USER_GROUP_PERMISSIONS_SUCCESS =
  '[UserGroup] Load Permissions Data Success';

export const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS =
  '[UserGroup] Load Customers Data';
export const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL =
  '[UserGroup] Load Customers Data Fail';
export const LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS =
  '[UserGroup] Load Customers Data Success';

export const CREATE_USER_GROUP = '[UserGroup] Create UserGroup';
export const CREATE_USER_GROUP_FAIL = '[UserGroup] Create UserGroup Fail';
export const CREATE_USER_GROUP_SUCCESS = '[UserGroup] Create UserGroup Success';

export const USER_GROUP_ASSIGN_MEMBER = '[UserGroup] Assign Member';
export const USER_GROUP_ASSIGN_MEMBER_FAIL = '[UserGroup] Assign Member Fail';
export const USER_GROUP_ASSIGN_MEMBER_SUCCESS =
  '[UserGroup] Assign Member Success';

export const USER_GROUP_ASSIGN_PERMISSION = '[UserGroup] Assign Permissions';
export const USER_GROUP_ASSIGN_PERMISSION_FAIL =
  '[UserGroup] Assign Permissions Fail';
export const USER_GROUP_ASSIGN_PERMISSION_SUCCESS =
  '[UserGroup] Assign Permissions Success';

export const UPDATE_USER_GROUP = '[UserGroup] Update UserGroup';
export const UPDATE_USER_GROUP_FAIL = '[UserGroup] Update UserGroup Fail';
export const UPDATE_USER_GROUP_SUCCESS = '[UserGroup] Update UserGroup Success';

export const DELETE_USER_GROUP = '[UserGroup] Delete UserGroup';
export const DELETE_USER_GROUP_FAIL = '[UserGroup] Delete UserGroup Fail';
export const DELETE_USER_GROUP_SUCCESS = '[UserGroup] Delete UserGroup Success';

export const USER_GROUP_UNASSIGN_ALL_MEMBERS = '[UserGroup] Unassign Members';
export const USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL =
  '[UserGroup] Unassign Members Fail';
export const USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS =
  '[UserGroup] Unassign Members Success';

export const USER_GROUP_UNASSIGN_MEMBER = '[UserGroup] Unassign Member';
export const USER_GROUP_UNASSIGN_MEMBER_FAIL =
  '[UserGroup] Unassign Member Fail';
export const USER_GROUP_UNASSIGN_MEMBER_SUCCESS =
  '[UserGroup] Unassign Member Success';

export const USER_GROUP_UNASSIGN_PERMISSION = '[UserGroup] Unassign Permission';
export const USER_GROUP_UNASSIGN_PERMISSION_FAIL =
  '[UserGroup] Unassign Permission Fail';
export const USER_GROUP_UNASSIGN_PERMISSION_SUCCESS =
  '[UserGroup] Unassign Permission Success';

export class LoadUserGroup extends EntityLoadAction {
  readonly type = LOAD_USER_GROUP;
  constructor(public payload: { userId: string; userGroupId: string }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class LoadUserGroupFail extends EntityFailAction {
  readonly type = LOAD_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class LoadUserGroupSuccess extends EntitySuccessAction {
  readonly type = LOAD_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup[]) {
    super(
      USER_GROUP_ENTITIES,
      payload.map((userGroup) => userGroup.uid)
    );
  }
}

export class LoadUserGroups extends EntityLoadAction {
  readonly type = LOAD_USER_GROUPS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(USER_GROUP_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadUserGroupsFail extends EntityFailAction {
  readonly type = LOAD_USER_GROUPS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(
      USER_GROUP_LIST,
      serializeB2BSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadUserGroupsSuccess extends EntitySuccessAction {
  readonly type = LOAD_USER_GROUPS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(USER_GROUP_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadPermissions extends EntityLoadAction {
  readonly type = LOAD_USER_GROUP_PERMISSIONS;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      USER_GROUP_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class LoadPermissionsFail extends EntityFailAction {
  readonly type = LOAD_USER_GROUP_PERMISSIONS_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      USER_GROUP_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.userGroupId),
      payload.error
    );
  }
}

export class LoadPermissionsSuccess extends EntitySuccessAction {
  readonly type = LOAD_USER_GROUP_PERMISSIONS_SUCCESS;
  constructor(
    public payload: {
      userGroupId: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      USER_GROUP_PERMISSIONS,
      serializeB2BSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class LoadAvailableOrgCustomers extends EntityLoadAction {
  readonly type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(
      USER_GROUP_AVAILABLE_CUSTOMERS,
      serializeB2BSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class LoadAvailableOrgCustomersFail extends EntityFailAction {
  readonly type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      params: B2BSearchConfig;
      error: any;
    }
  ) {
    super(
      USER_GROUP_AVAILABLE_CUSTOMERS,
      serializeB2BSearchConfig(payload.params, payload.userGroupId),
      payload.error
    );
  }
}

export class LoadAvailableOrgCustomersSuccess extends EntitySuccessAction {
  readonly type = LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS;
  constructor(
    public payload: {
      userGroupId: string;
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(
      USER_GROUP_AVAILABLE_CUSTOMERS,
      serializeB2BSearchConfig(payload.params, payload.userGroupId)
    );
  }
}

export class CreateUserGroup extends EntityLoadAction {
  readonly type = CREATE_USER_GROUP;
  constructor(public payload: { userId: string; userGroup: UserGroup }) {
    super(USER_GROUP_ENTITIES, payload.userGroup.uid);
  }
}

export class CreateUserGroupFail extends EntityFailAction {
  readonly type = CREATE_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class CreateUserGroupSuccess extends EntitySuccessAction {
  readonly type = CREATE_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class AssignMember extends EntityLoadAction {
  readonly type = USER_GROUP_ASSIGN_MEMBER;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      customerId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId);
  }
}

export class AssignMemberFail extends EntityFailAction {
  readonly type = USER_GROUP_ASSIGN_MEMBER_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      customerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId, payload.error);
  }
}

export class AssignMemberSuccess extends EntitySuccessAction {
  readonly type = USER_GROUP_ASSIGN_MEMBER_SUCCESS;
  constructor(public payload: { customerId: string; selected: boolean }) {
    super(B2B_USER_ENTITIES, payload.customerId, payload);
  }
}

export class AssignPermission extends EntityLoadAction {
  readonly type = USER_GROUP_ASSIGN_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      permissionUid: string;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid);
  }
}

export class AssignPermissionFail extends EntityFailAction {
  readonly type = USER_GROUP_ASSIGN_PERMISSION_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      permissionUid: string;
      error: any;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload.error);
  }
}

export class AssignPermissionSuccess extends EntitySuccessAction {
  readonly type = USER_GROUP_ASSIGN_PERMISSION_SUCCESS;
  constructor(public payload: { permissionUid: string; selected: boolean }) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload);
  }
}

export class UpdateUserGroup extends EntityLoadAction {
  readonly type = UPDATE_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      userGroup: UserGroup;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroup.uid);
  }
}

export class UpdateUserGroupFail extends EntityFailAction {
  readonly type = UPDATE_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class UpdateUserGroupSuccess extends EntitySuccessAction {
  readonly type = UPDATE_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class DeleteUserGroup extends EntityLoadAction {
  readonly type = DELETE_USER_GROUP;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
    }
  ) {
    super(USER_GROUP_ENTITIES, payload.userGroupId);
  }
}

export class DeleteUserGroupFail extends EntityFailAction {
  readonly type = DELETE_USER_GROUP_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(USER_GROUP_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class DeleteUserGroupSuccess extends EntitySuccessAction {
  readonly type = DELETE_USER_GROUP_SUCCESS;
  constructor(public payload: UserGroup) {
    super(USER_GROUP_ENTITIES, payload.uid, payload);
  }
}

export class UnassignMember extends EntityLoadAction {
  readonly type = USER_GROUP_UNASSIGN_MEMBER;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      customerId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId);
  }
}

export class UnassignMemberFail extends EntityFailAction {
  readonly type = USER_GROUP_UNASSIGN_MEMBER_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      customerId: string;
      error: any;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.customerId, payload.error);
  }
}

export class UnassignMemberSuccess extends EntitySuccessAction {
  readonly type = USER_GROUP_UNASSIGN_MEMBER_SUCCESS;
  constructor(public payload: { customerId: string; selected: boolean }) {
    super(B2B_USER_ENTITIES, payload.customerId, payload);
  }
}

export class UnassignAllMembers extends EntityLoadAction {
  readonly type = USER_GROUP_UNASSIGN_ALL_MEMBERS;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
    }
  ) {
    super(B2B_USER_ENTITIES, payload.userGroupId);
  }
}

export class UnassignAllMembersFail extends EntityFailAction {
  readonly type = USER_GROUP_UNASSIGN_ALL_MEMBERS_FAIL;
  constructor(public payload: { userGroupId: string; error: any }) {
    super(B2B_USER_ENTITIES, payload.userGroupId, payload.error);
  }
}

export class UnassignAllMembersSuccess extends EntitySuccessAction {
  readonly type = USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS;
  constructor(public payload: UserGroup) {
    super(B2B_USER_ENTITIES, payload.uid, payload);
  }
}

export class UnassignPermission extends EntityLoadAction {
  readonly type = USER_GROUP_UNASSIGN_PERMISSION;
  constructor(
    public payload: {
      userId: string;
      userGroupId: string;
      permissionUid: string;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid);
  }
}

export class UnassignPermissionFail extends EntityFailAction {
  readonly type = USER_GROUP_UNASSIGN_PERMISSION_FAIL;
  constructor(
    public payload: {
      userGroupId: string;
      permissionUid: string;
      error: any;
    }
  ) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload.error);
  }
}

export class UnassignPermissionSuccess extends EntitySuccessAction {
  readonly type = USER_GROUP_UNASSIGN_PERMISSION_SUCCESS;
  constructor(public payload: { permissionUid: string; selected: boolean }) {
    super(PERMISSION_ENTITIES, payload.permissionUid, payload);
  }
}

export type UserGroupAction =
  | LoadUserGroup
  | LoadUserGroupFail
  | LoadUserGroupSuccess
  | LoadUserGroups
  | LoadUserGroupsFail
  | LoadUserGroupsSuccess
  | LoadPermissions
  | LoadPermissionsFail
  | LoadPermissionsSuccess
  | LoadAvailableOrgCustomers
  | LoadAvailableOrgCustomersFail
  | LoadAvailableOrgCustomersSuccess
  | CreateUserGroup
  | CreateUserGroupFail
  | CreateUserGroupSuccess
  | AssignMember
  | AssignMemberFail
  | AssignMemberSuccess
  | AssignPermission
  | AssignPermissionFail
  | AssignPermissionSuccess
  | UpdateUserGroup
  | UpdateUserGroupFail
  | UpdateUserGroupSuccess
  | DeleteUserGroup
  | DeleteUserGroupFail
  | DeleteUserGroupSuccess
  | UnassignMember
  | UnassignMemberFail
  | UnassignMemberSuccess
  | UnassignAllMembers
  | UnassignAllMembersFail
  | UnassignAllMembersSuccess
  | UnassignPermission
  | UnassignPermissionFail
  | UnassignPermissionSuccess;