import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Claims } from 'src/app/models/claims.model';
import { Payments } from 'src/app/models/payments.model';
import { UserPolicies } from 'src/app/models/userpolicies.model';
import { ClaimService } from 'src/app/service/claim.service';
import { PaymentsService } from 'src/app/service/payments.service';
import { UserPoliciesService } from 'src/app/service/user-policies.service';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.css']
})
export class UserPoliciesComponent implements OnInit {
  userPolicies: UserPolicies[] = [];
  response: any;
  editUPForm!: FormGroup;
  showEditForm = false;
  selectedUP!: UserPolicies;
  selectedFilterMethod: string = '';
  userPolicyId: number = 0;
  userId: number = 0;
  claimForm!: FormGroup;
  showClaimForm = false;
  payForm!: FormGroup;
  showPayForm = false;
  claims: Claims = {
    claimId: 0,
    claimDate: new Date(),
    claimAmount: 0,
    claimStatus: '',
    userPolicyId: 0
  };
  payments: Payments = {
    paymentId: 0,
    paymentDate: new Date(),
    paymentStatus: 'Completed',
    totalAmount: 0,
    fine: 0,
    paymentMethod: 'Credit Card',
    userPolicyId: 0
  }

  constructor(private userPoliciesService: UserPoliciesService, private router: Router, private formbuilder: FormBuilder, private claimService: ClaimService, private paymentService: PaymentsService) {

  }

  ngOnInit(): void {
    this.claimForm = this.formbuilder.group({
      claimId: [],
      claimDate: ['', Validators.required],
      claimAmount: [0, Validators.required],
      claimStatus: ['Pending' || 'Approved' || 'Rejected']
    });
    this.payForm = this.formbuilder.group({
      paymentId: [],
      paymentDate: ['', Validators.required],
      paymentStatus: ['Completed'],
      totalAmount: [0, Validators.required],
      fine: [0, Validators.required],
      paymentMethod: ['Credit Card' || 'Debit Card' || 'Net Banking' || 'Cash', Validators.required]
    });

    if (this.isUserLoggedIn()) {
      this.getUserPoliciesByUserId();
    } else if (this.isAdminLoggedIn()) {
      this.getAllUserPolicies();
      this.editUPForm = this.formbuilder.group({
        startDate: ['', Validators.required],
        durationInYears: ['', Validators.required],
        policyId: ['', Validators.required]
      });
    }
  }

  registerClaim(userPolicyId: number): void {
    this.showClaimForm = true;
    this.userPolicyId = userPolicyId;
  }

  makePayment(userPolicy: UserPolicies): void {
    this.showPayForm = true;
    this.selectedUP = userPolicy;
  }

  onPay(): void {
    this.payments.userPolicyId = this.selectedUP.userPolicyId;
    this.payments.paymentDate = this.payForm.value.paymentDate;
    this.payments.paymentMethod = this.payForm.value.paymentMethod;
    this.payments.paymentStatus = "Completed";
    this.calculateFine(this.payments.paymentDate, this.selectedUP);
    this.paymentService.makePayment(this.payments).subscribe(data => {
      console.log(data);
      this.showPayForm = false;
      // this.router.navigate(['/payments'])
    }, error => {
      console.log(error);
    });
  }

  onRegister() {
    this.claims.userPolicyId = this.userPolicyId;
    this.claims.claimDate = this.claimForm.value.claimDate;
    this.claims.claimAmount = this.claimForm.value.claimAmount;
    this.claims.claimStatus = "Pending";
    this.claimService.registerClaim(this.claims).subscribe(
      responseData => {
        console.log(responseData);
        alert("Claim Registered Success");
        this.router.navigate(['/claims']);
      },
      error => {
        console.log(error);
        console.log("failed to register");
        alert("Claim Registration failed");
        window.location.reload();
      }
    );
  }

  editUserPolicy(userPolicy: UserPolicies) {
    this.selectedUP = userPolicy;
    this.editUPForm.patchValue({
      startDate: userPolicy.startDate,
      durationInYears: userPolicy.durationInYears,
      policyId: userPolicy.policy?.policyId
    });
    this.showEditForm = true;
  }

  onSubmit() {
    if (this.editUPForm.valid) {
      const updateUserPolicy: UserPolicies = {
        userPolicyId: this.selectedUP.userPolicyId,
        startDate: this.editUPForm.value.startDate,
        durationInYears: this.editUPForm.value.durationInYears,
        policyId: this.editUPForm.value.policyId,
        userId: this.selectedUP.userId
      };

      this.userPoliciesService.updateUserPolicies(updateUserPolicy).subscribe(
        () => {
          this.showEditForm = false;
          this.getAllUserPolicies();
        },
        (error: any) => {
          console.error('Error updating user policy', error);
        }
      );
    }
  }

  get f() {
    return this.editUPForm.controls;
  }
  get f1() {
    return this.claimForm.controls;
  }
  get f2() {
    return this.payForm.controls;
  }

  getUserPoliciesByUserId() {
    this.userPoliciesService.getUserPoliciesbyUserId(localStorage.getItem('userId')).subscribe(
      (response) => {
        this.userPolicies = response;
      },
      (error) => {
        console.log('Error fetching user policies:', error);
        this.userPolicies = [];
      }
    );
  }

  getAllUserPolicies() {
    this.userPoliciesService.getAllUserPolicies().subscribe(
      (response) => {
        this.userPolicies = response;
      },
      (error) => {
        console.log('Error fetching user policies:', error);
        this.userPolicies = [];
      }
    );
  }

  isAdminLoggedIn() {
    return localStorage.getItem('token') !== null && localStorage.getItem('userType') === 'Admin';
  }

  isUserLoggedIn() {
    return localStorage.getItem('token') !== null && localStorage.getItem('userType') === 'User';
  }

  deleteUserPolicy(userPolicyId: number) {
    this.userPoliciesService.deleteUserPolicy(this.userPolicies[0].userPolicyId).subscribe(
      (response) => {
        this.userPolicies = response;
      },
      (error) => {
        console.log('Error fetching user policies:', error);
        this.userPolicies = [];
      }
    );
  }

  onFilterMethodChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'getUserPolicyByUserPolicyId' || value === 'getUserPolicyByUserId') {
      this.selectedFilterMethod = value;
    }
  }

  onGetUserPolicyByUserPolicyId(): void {
    this.getUserPolicyByUserPolicyId(this.userPolicyId);
  }

  getUserPolicyByUserPolicyId(userPolicyId: number): void {
    if (userPolicyId > 0) {
      this.userPoliciesService.getUserPolicyByUserPolicyId(userPolicyId).subscribe(
        (response: UserPolicies) => { // Expecting a single UserPolicies object
          this.userPolicies = [response]; // Wrap the single object in an array
        },
        (error) => {
          console.error('Error fetching registered policies with the given Id:', error);
        }
      );
    } else {
      console.error('Please enter a valid Id');
    }
  }

  onGetUserPolicyByUserId(): void {
    this.getUserPolicyByUserId(this.userId);
  }

  getUserPolicyByUserId(userId: number): void {
    if (this.userId > 0) {
      this.userPoliciesService.getUserPoliciesbyUserId(userId).subscribe(
        (response) => {
          this.userPolicies = response; // Update policies array with the fetched policies
        },
        (error) => {
          console.error('Error fetching registered policies with the given Id:', error);
        }
      );
    } else {
      console.error('Please enter a valid Id');
    }
  }

  calculateFine(paymentDate: Date, userPolicies: UserPolicies): void {
    const policy = userPolicies.policy;
    if (!policy) {
        console.error('Policy is undefined');
        return;
    }

    const termPeriod = policy.termPeriod;
    const startDate = new Date(userPolicies.startDate);
    let dueDate: Date | null = null;

    if (termPeriod === "Monthly") {
        dueDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
    } else if (termPeriod === "Quarterly") {
        dueDate = new Date(startDate.setMonth(startDate.getMonth() + 3));
    } else if (termPeriod === "Half-Yearly") {
        dueDate = new Date(startDate.setMonth(startDate.getMonth() + 6));
    } else if (termPeriod === "Annually") {
        dueDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
    }

    if (dueDate && paymentDate > dueDate) {
        const daysPastDue = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        this.payments.fine = daysPastDue * policy.termAmount * 0.001;
    } else {
        this.payments.fine = 0;
    }
  
    this.payments.totalAmount = policy.termAmount + this.payments.fine;
}

calculateTotalAmountAndFine(event: Event): void {
  const target = event.target as HTMLInputElement;
  const paymentDate = target.value;
  if (paymentDate) {
    const selectedDate = new Date(paymentDate);
    const userPolicy = this.selectedUP;
    if (userPolicy) {
      this.calculateFine(selectedDate, userPolicy);
    } else {
      console.error('User policy is null.');
    }
  } else {
    console.error('Payment date is null.');
  }
}


}
