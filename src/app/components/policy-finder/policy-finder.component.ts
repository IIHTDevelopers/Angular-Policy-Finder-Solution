import { Component } from '@angular/core';

export interface Policy {
  id: number;
  policyName: string;
  policyDescription: string;
  policyAmount: number;
  policyType: string;
}

@Component({
  selector: 'app-policy-finder',
  templateUrl: './policy-finder.component.html',
  styleUrls: ['./policy-finder.component.css']
})
export class PolicyFinderComponent {
  policies: Policy[] = [];
  newPolicy: Policy = {} as Policy;
  editedPolicy: Policy = {} as Policy;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addPolicy(): void {
    this.newPolicy.id = this.policies.length + 1;
    this.policies.push({ ...this.newPolicy });
    this.newPolicy = {} as Policy;
  }

  editPolicy(policy: Policy): void {
    this.isEditing = true;
    this.editedPolicy = { ...policy };
  }

  saveEditedPolicy(): void {
    const index = this.policies.findIndex(policy => policy.id === this.editedPolicy.id);
    if (index !== -1) {
      this.policies[index] = { ...this.editedPolicy };
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedPolicy = {} as Policy;
  }

  deletePolicy(policy: Policy): void {
    this.policies = this.policies.filter(item => item.id !== policy.id);
  }

  get filteredPolicies(): Policy[] {
    return this.policies.filter(policy =>
      policy.policyName.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
