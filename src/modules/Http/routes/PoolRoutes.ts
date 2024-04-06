// src/modules/HTTP/routes/PoolRoutes.ts
import express, { Router, Request, Response } from 'express';
import { SolanaService } from '../../Solana/SolanaService';

export class PoolRoutes {
  private solanaService: SolanaService;
  public router: Router;

  constructor() {
    this.solanaService = new SolanaService();
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/', this.getAllPools.bind(this));
    this.router.get('/search', this.searchPools.bind(this));
  }

  private async getAllPools(req: Request, res: Response): Promise<void> {
    const allPools = await this.solanaService.getAllPools();
    res.json(allPools);
  }

  private async searchPools(req: Request, res: Response): Promise<void> {
    const { poolId, lpMint, baseToken, marketId } = req.query;
    let searchParams: Record<string, string> = {};

    // Build the search parameters dynamically based on the query
    if (poolId) searchParams['poolId'] = poolId as string;
    if (lpMint) searchParams['lpMint'] = lpMint as string;
    if (baseToken) searchParams['baseToken'] = baseToken as string;
    if (marketId) searchParams['marketId'] = marketId as string;

    const foundPools = await this.solanaService.searchPools(searchParams);
    res.json(foundPools);
  }
}
