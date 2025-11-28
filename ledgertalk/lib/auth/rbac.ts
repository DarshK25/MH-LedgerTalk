// RBAC (Role-Based Access Control) utilities
export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    ACCOUNTANT = 'accountant',
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
    const roleHierarchy = {
        [Role.ADMIN]: 3,
        [Role.ACCOUNTANT]: 2,
        [Role.USER]: 1,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
