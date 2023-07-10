import { Address, BigInt } from "@graphprotocol/graph-ts";
import {Transfer as TransferEvent} from "../generated/HonToken/HonToken";
import {StakingPoolBalance} from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
    if (event.params) 
    {
      const landOwnerPool = Address.fromHexString("0xb99f7BC7C3E3E28F5e8c7402ccE7c25bb2Ae7659")
      const landSharePool = Address.fromHexString("0x5CcB4a8F2Ff0a7c7Ea4Cc671dd6B980e157065f6")

      if(event.params.from.equals(landOwnerPool) || event.params.from.equals(landSharePool) || event.params.to.equals(landOwnerPool) || event.params.to.equals(landSharePool)){
        let stakingPoolBalanceExist = StakingPoolBalance.load("1");
        if (stakingPoolBalanceExist) 
        {
            if(event.params.from.equals(landOwnerPool))
            {
                stakingPoolBalanceExist.landOwnerPool = stakingPoolBalanceExist.landOwnerPool.minus(event.params.value)
            }
            else if (event.params.from.equals(landSharePool))
            {
                stakingPoolBalanceExist.landSharePool = stakingPoolBalanceExist.landSharePool.minus(event.params.value)
            }
            else if(event.params.to.equals(landOwnerPool))
            {
                stakingPoolBalanceExist.landOwnerPool = stakingPoolBalanceExist.landOwnerPool.plus(event.params.value)
            }
            else if (event.params.to.equals(landSharePool))
            {
                stakingPoolBalanceExist.landSharePool = stakingPoolBalanceExist.landSharePool.plus(event.params.value)
            }
          
            stakingPoolBalanceExist.save();

        } else {
            stakingPoolBalanceExist = new StakingPoolBalance("1");
            if(event.params.to.equals(landOwnerPool))
            {
                stakingPoolBalanceExist.landOwnerPool = event.params.value
                stakingPoolBalanceExist.landSharePool = BigInt.fromI32(0)
            }
            else if (event.params.to.equals(landSharePool))
            {
                stakingPoolBalanceExist.landOwnerPool = BigInt.fromI32(0)
                stakingPoolBalanceExist.landSharePool = stakingPoolBalanceExist.landSharePool.plus(event.params.value)
            }
          
            stakingPoolBalanceExist.save();
        }

      }
      
    }
  }