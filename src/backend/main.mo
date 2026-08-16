import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OQL     "mo:caffeineai-oql";
import Entity  "mo:caffeineai-oql/Entity";
import Expose  "mo:caffeineai-oql/Expose";
import PrincipalValue "mo:caffeineai-oql/PrincipalValue";
import TextValue "mo:caffeineai-oql/TextValue";
import Principal "mo:core/Principal";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  // OQL — expose the access-control user-role map as a queryable entity.
  //
  // `userRoles : Map.Map<Principal, UserRole>` is the only persisted
  // collection holding queryable data. Each row is a (user, role) pair:
  // the Map key (a Principal) is promoted to the `user` column and tagged
  // as the owner, and the `UserRole` variant is rendered as its tag text
  // in the `role` column. Authorization is `.controllerOrScoped()` so the
  // Data Intelligence agent (controller) can answer aggregate questions
  // ("how many admins", "list users by role") while each signed-in caller
  // reads only their own role row.
  include Expose({
    entities = [
      OQL.Entity.manual<(Principal, AccessControl.UserRole)>(
        "userRole",
        func () = accessControlState.userRoles.entries(),
        "UserRole",
        "user",
      )
        .payload("user", func ((p, _)) = p)
        .payload("role", func ((_, r)) : Text =
          switch r { case (#admin) "admin"; case (#user) "user"; case (#guest) "guest" })
        .sample((Principal.fromText("aaaaa-aa"), #guest))
        .ownedBy("user")
        .controllerOrScoped()
        .build(),
    ];
  });
};
